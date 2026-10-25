import React, { useCallback, useEffect, useRef, useState } from "react"

import { useLocation } from "@gatsbyjs/reach-router"
import gsap from "gsap"
import { createPortal } from "react-dom"
import { FiArrowUpRight } from "react-icons/fi"
import { useIsomorphicLayoutEffect } from "usehooks-ts"

import {
  cachedFaviconPath,
  linkPreviewKey,
  loadLinkPreviews,
  shouldReduceMotion,
} from "@utils"

import type { LinkPreviewData } from "@utils"

/*
 * Hover cards for links. One card for the whole site, mounted by the layout
 * and portalled to <body> (links sit inside <p>, which can't hold a card).
 * Any <a data-preview> opts in - AnimatedLink and links in posts do - and
 * gets a card only if the build cached a preview for its target.
 */

const TRIGGER = "a[data-preview]"

/* Hover intent, ms */
const OPEN_DELAY = 300 // rest on a link this long before its card opens
const HOP_DELAY = 90 // with a card already up (or just closed), move on faster
const HOP_WINDOW = 450 // how long after a close the faster hop still applies
const CLOSE_DELAY = 150 // grace to cross the gap from link to card

/* Geometry, px */
const GAP = 10
const EDGE = 12

interface Active {
  key: string
  data: LinkPreviewData
  anchor: HTMLAnchorElement
  pointer: { x: number; y: number } | null
}

type Phase = "closed" | "open" | "closing"

const canHover = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches

const preloaded = new Set<string>()
const preloadImage = (src?: string) => {
  if (!src || preloaded.has(src)) return
  preloaded.add(src)
  const img = new Image()
  img.decoding = "async"
  img.src = src
}

const stashTitle = (a: HTMLAnchorElement) => {
  // The native tooltip would pop up on top of the card a moment later
  const title = a.getAttribute("title")
  if (!title) return
  a.dataset.previewTitle = title
  a.removeAttribute("title")
}

const restoreTitle = (a?: HTMLAnchorElement | null) => {
  const title = a?.dataset.previewTitle
  if (!a || title == null) return
  a.setAttribute("title", title)
  delete a.dataset.previewTitle
}

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), Math.max(min, max))

const distanceTo = (r: DOMRect, p: { x: number; y: number }) =>
  Math.hypot(
    p.x - clamp(p.x, r.left, r.right),
    p.y - clamp(p.y, r.top, r.bottom)
  )

const describeUrl = (key: string) => {
  try {
    const url = new URL(key)
    let rest = url.pathname === "/" ? "" : url.pathname
    try {
      rest = decodeURI(rest)
    } catch {}
    return `${url.hostname.replace(/^www\./, "")}${rest}${url.search}`
  } catch {
    return key
  }
}

const SiteIcon: React.FC<{
  host: string
  label: string
}> = ({ host, label }) => {
  const [failed, setFailed] = useState(false)
  const src = cachedFaviconPath(host)
  if (src && !failed) {
    return (
      <img
        src={src}
        alt=""
        width={16}
        height={16}
        onError={() => setFailed(true)}
        className="size-4 shrink-0 rounded object-contain"
      />
    )
  }
  return (
    <span className="grid size-4 shrink-0 place-items-center rounded bg-blue-600 text-[9px] font-bold uppercase leading-none text-white dark:bg-blue-500">
      {label.replace(/^www\./, "").charAt(0)}
    </span>
  )
}

const PreviewImage: React.FC<{
  src: string
  className: string
  onError: () => void
}> = ({ src, className, onError }) => (
  <img
    key={src}
    src={src}
    alt=""
    decoding="async"
    draggable={false}
    data-card-image=""
    onLoad={(e) => (e.currentTarget.dataset.loaded = "true")}
    onError={onError}
    className={`${className} opacity-0 transition-opacity duration-300 data-[loaded=true]:opacity-100`}
  />
)

interface CardProps {
  active: Active
  showImage: boolean
  onImageError: () => void
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const Card = React.forwardRef<HTMLAnchorElement, CardProps>(
  ({ active, showImage, onImageError, onClick }, ref) => {
    const { key, data, anchor } = active
    const host = new URL(key).hostname
    const site = data.site || host.replace(/^www\./, "")
    const hasImage = showImage && !!data.image
    const banner =
      hasImage &&
      (!data.width || !data.height || data.width / data.height >= 1.3)
    const thumb = hasImage && !banner
    const imageBg = { backgroundColor: data.color }

    return (
      <a
        ref={ref}
        href={anchor.href}
        target={anchor.target || undefined}
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        data-link-preview=""
        onClick={onClick}
        className="group invisible absolute left-0 top-0 z-[60] block w-[21rem] max-w-[calc(100vw-24px)] overflow-hidden rounded-2xl border border-slate-200/80 bg-white text-left font-sans text-slate-900 no-underline shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-6px_rgba(15,23,42,0.14),0_28px_56px_-20px_rgba(15,23,42,0.24)] outline-none transition-[border-color] duration-200 hover:border-blue-300/70 dark:border-slate-700/80 dark:bg-slate-800 dark:text-slate-50 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_24px_-6px_rgba(0,0,0,0.45),0_28px_56px_-20px_rgba(0,0,0,0.7)] dark:hover:border-blue-400/40">
        {banner && (
          <div
            data-card-banner=""
            className="relative aspect-[1.91/1] w-full overflow-hidden bg-slate-100 dark:bg-slate-700"
            style={imageBg}>
            <div className="size-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
              <PreviewImage
                src={data.image!}
                onError={onImageError}
                className="size-full object-cover"
              />
            </div>
            <span className="pointer-events-none absolute inset-0 shadow-[inset_0_-1px_0_rgba(15,23,42,0.06)] dark:shadow-[inset_0_-1px_0_rgba(255,255,255,0.06)]" />
          </div>
        )}
        <div data-card-body="" className="flex gap-3 p-4">
          <div className="min-w-0 flex-1">
            <div
              data-card-part=""
              className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <SiteIcon host={host} label={site} />
              <span className="truncate font-medium text-slate-700 dark:text-slate-200">
                {site}
              </span>
            </div>
            <div
              data-card-part=""
              className="mt-2 line-clamp-2 text-[15px] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {data.title}
            </div>
            {data.description && (
              <div
                data-card-part=""
                className="mt-1.5 line-clamp-3 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
                {data.description}
              </div>
            )}
          </div>
          {thumb && (
            <div
              className="relative mt-0.5 size-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-900/5 dark:bg-slate-700 dark:ring-white/10"
              style={imageBg}>
              <PreviewImage
                src={data.image!}
                onError={onImageError}
                className="size-full object-cover"
              />
            </div>
          )}
        </div>
        <div
          data-card-part=""
          className="mx-4 flex items-center gap-2 border-t border-slate-100 py-2.5 font-mono text-[11px] text-slate-400 dark:border-slate-700/70 dark:text-slate-500">
          <span className="truncate">{describeUrl(key)}</span>
          <FiArrowUpRight
            aria-hidden="true"
            className="ml-auto size-3.5 shrink-0 text-blue-600 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-0.5 dark:text-blue-400"
          />
        </div>
      </a>
    )
  }
)
Card.displayName = "LinkPreviewCard"

const LinkPreview: React.FC = () => {
  const [active, setActive] = useState<Active | null>(null)
  const [brokenImage, setBrokenImage] = useState<string | null>(null)
  const activeRef = useRef<Active | null>(null)
  const cardRef = useRef<HTMLAnchorElement | null>(null)
  const pendingRef = useRef<HTMLAnchorElement | null>(null)
  const mutedRef = useRef<HTMLAnchorElement | null>(null)
  const phaseRef = useRef<Phase>("closed")
  const lastClosedAt = useRef(0)
  const lastBox = useRef<{ left: number; top: number; height: number } | null>(
    null
  )
  const timers = useRef({ open: 0, close: 0 })
  const { pathname } = useLocation()

  const show = useCallback((next: Active | null) => {
    activeRef.current = next
    setActive(next)
  }, [])

  const close = useCallback(
    (animate = true) => {
      window.clearTimeout(timers.current.open)
      window.clearTimeout(timers.current.close)
      pendingRef.current = null
      const current = activeRef.current
      if (!current) return
      const closing = phaseRef.current === "closing"
      if (closing && animate) return
      restoreTitle(current.anchor)
      if (!closing) lastClosedAt.current = performance.now()
      const card = cardRef.current
      if (!card || !animate || shouldReduceMotion()) {
        if (card) gsap.killTweensOf(card)
        phaseRef.current = "closed"
        show(null)
        return
      }
      phaseRef.current = "closing"
      gsap.to(card, {
        autoAlpha: 0,
        y: card.dataset.side === "top" ? 4 : -4,
        scale: 0.98,
        duration: 0.14,
        ease: "power2.in",
        overwrite: true,
        onComplete: () => {
          if (phaseRef.current !== "closing") return
          phaseRef.current = "closed"
          show(null)
        },
      })
    },
    [show]
  )

  const scheduleClose = useCallback(
    (delay = CLOSE_DELAY) => {
      window.clearTimeout(timers.current.close)
      timers.current.close = window.setTimeout(() => close(), delay)
    },
    [close]
  )

  const scheduleOpen = useCallback(
    (anchor: HTMLAnchorElement, pointer: Active["pointer"]) => {
      if (mutedRef.current === anchor) return
      const current = activeRef.current
      if (
        pendingRef.current === anchor ||
        (current?.anchor === anchor && phaseRef.current === "open")
      ) {
        window.clearTimeout(timers.current.close)
        return
      }
      const key = linkPreviewKey(anchor.getAttribute("href"))
      // Cards preview where a link leaves to; pages on this site key on their
      // path ("/blog") and get none
      if (!key || key.startsWith("/")) return

      window.clearTimeout(timers.current.open)
      pendingRef.current = anchor
      const previews = loadLinkPreviews()
      // Warm the image during the delay so the card opens fully painted
      previews.then((all) => preloadImage(all[key]?.image))
      const hop =
        phaseRef.current !== "closed" ||
        performance.now() - lastClosedAt.current < HOP_WINDOW

      timers.current.open = window.setTimeout(
        async () => {
          const data = (await previews)[key]
          if (pendingRef.current !== anchor) return
          pendingRef.current = null
          if (!data || !anchor.isConnected) return
          window.clearTimeout(timers.current.close)
          restoreTitle(activeRef.current?.anchor)
          stashTitle(anchor)
          show({ key, data, anchor, pointer })
        },
        hop ? HOP_DELAY : OPEN_DELAY
      )
    },
    [show]
  )

  useEffect(() => {
    const anchorOf = (t: EventTarget | null) =>
      t instanceof Element
        ? (t.closest(TRIGGER) as HTMLAnchorElement | null)
        : null
    const inCard = (t: EventTarget | null) =>
      t instanceof Node && !!cardRef.current?.contains(t)
    const forget = (anchor: HTMLAnchorElement) => {
      if (mutedRef.current === anchor) mutedRef.current = null
      if (pendingRef.current === anchor) {
        window.clearTimeout(timers.current.open)
        pendingRef.current = null
      }
    }

    // Mouse only: a tap is a click, and touch has nowhere to hover
    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      if (inCard(e.target)) {
        window.clearTimeout(timers.current.close)
        return
      }
      const anchor = anchorOf(e.target)
      if (anchor) scheduleOpen(anchor, { x: e.clientX, y: e.clientY })
    }

    const onOut = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      const from = anchorOf(e.target)
      const fromCard = inCard(e.target)
      if (!from && !fromCard) return
      const to = e.relatedTarget
      if (from && to instanceof Node && from.contains(to)) return
      if (fromCard && inCard(to)) return
      if (from) forget(from)
      if (activeRef.current) scheduleClose()
    }

    // Keyboard focus too, but not the focus a tap leaves behind on touch
    const onFocusIn = (e: FocusEvent) => {
      const anchor = anchorOf(e.target)
      if (!anchor || !canHover()) return
      let keyboard = true
      try {
        keyboard = anchor.matches(":focus-visible")
      } catch {}
      if (keyboard) scheduleOpen(anchor, null)
    }

    const onFocusOut = (e: FocusEvent) => {
      const anchor = anchorOf(e.target)
      if (!anchor) return
      forget(anchor)
      if (activeRef.current?.anchor === anchor) scheduleClose()
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      const current = activeRef.current?.anchor ?? pendingRef.current
      if (!current) return
      mutedRef.current = current
      close()
    }

    const onPointerDown = (e: PointerEvent) => {
      if (inCard(e.target)) return
      // A click is a decision; don't let the card (re)appear under it
      const anchor = anchorOf(e.target)
      if (anchor) mutedRef.current = anchor
      if (activeRef.current || pendingRef.current) close()
    }

    const onDismiss = () => close(false)

    document.addEventListener("pointerover", onOver)
    document.addEventListener("pointerout", onOut)
    document.addEventListener("focusin", onFocusIn)
    document.addEventListener("focusout", onFocusOut)
    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown, true)
    window.addEventListener("resize", onDismiss)
    window.addEventListener("blur", onDismiss)
    return () => {
      document.removeEventListener("pointerover", onOver)
      document.removeEventListener("pointerout", onOut)
      document.removeEventListener("focusin", onFocusIn)
      document.removeEventListener("focusout", onFocusOut)
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown, true)
      window.removeEventListener("resize", onDismiss)
      window.removeEventListener("blur", onDismiss)
      window.clearTimeout(timers.current.open)
      window.clearTimeout(timers.current.close)
      restoreTitle(activeRef.current?.anchor)
    }
  }, [close, scheduleClose, scheduleOpen])

  // A new page means the link under the card is gone
  useEffect(() => {
    mutedRef.current = null
    close(false)
  }, [pathname, close])

  // Place the card, then animate it in (or glide it over from the last link)
  useIsomorphicLayoutEffect(() => {
    const card = cardRef.current
    if (!active || !card) {
      lastBox.current = null
      return
    }
    const rects = Array.from(active.anchor.getClientRects())
    if (!rects.length) {
      close(false)
      return
    }
    const pointer = active.pointer
    // A link wrapped over two lines: hang the card off the line you're on
    const rect = pointer
      ? rects.reduce((best, r) =>
          distanceTo(r, pointer) < distanceTo(best, pointer) ? r : best
        )
      : rects[0]

    // Where the card is right now, in case a glide was cut short
    gsap.killTweensOf(card)
    const from = {
      left: parseFloat(card.style.left) || 0,
      top: parseFloat(card.style.top) || 0,
      height: card.style.height ? card.offsetHeight : lastBox.current?.height,
    }
    gsap.set(card, { clearProps: "height" })
    const banner = card.querySelector<HTMLElement>("[data-card-banner]")
    if (banner) banner.style.height = banner.style.display = ""
    const width = card.offsetWidth
    let height = card.offsetHeight
    const vw = document.documentElement.clientWidth
    const vh = window.innerHeight

    const anchorX =
      pointer && rect.width > width
        ? clamp(pointer.x, rect.left, rect.right)
        : rect.left + rect.width / 2
    const left = clamp(anchorX - width / 2, EDGE, vw - width - EDGE)
    const spaceBelow = vh - rect.bottom - GAP - EDGE
    const spaceAbove = rect.top - GAP - EDGE
    const side =
      height <= spaceBelow
        ? "bottom"
        : height <= spaceAbove || spaceAbove > spaceBelow
          ? "top"
          : "bottom"
    // Short on room either way: the image gives up height before the card
    // would leave the viewport or cover the link (and goes below 96px)
    const room = side === "bottom" ? spaceBelow : spaceAbove
    if (height > room && banner) {
      const trimmed = banner.offsetHeight - (height - room)
      if (trimmed >= 96) banner.style.height = `${trimmed}px`
      else banner.style.display = "none"
      height = card.offsetHeight
    }
    const top = clamp(
      side === "bottom" ? rect.bottom + GAP : rect.top - GAP - height,
      EDGE,
      vh - height - EDGE
    )
    const box = {
      left: left + window.scrollX,
      top: top + window.scrollY,
      height,
    }
    const origin = `${clamp(anchorX - left, 24, width - 24)}px ${
      side === "bottom" ? "0%" : "100%"
    }`
    card.dataset.side = side

    const moving = !!lastBox.current && phaseRef.current !== "closed"
    phaseRef.current = "open"
    lastBox.current = box

    if (shouldReduceMotion()) {
      gsap.set(card, {
        left: box.left,
        top: box.top,
        autoAlpha: 1,
        y: 0,
        scale: 1,
      })
      return
    }

    if (moving) {
      // Hop between links: glide, let the height follow, fade the new copy in
      gsap.fromTo(
        card,
        { left: from.left, top: from.top, height: from.height ?? height },
        {
          ...box,
          autoAlpha: 1,
          y: 0,
          scale: 1,
          transformOrigin: origin,
          duration: 0.34,
          ease: "power3.out",
          clearProps: "height",
        }
      )
      // (the image fades itself in once loaded; see PreviewImage)
      gsap.fromTo(
        card.querySelectorAll("[data-card-part]"),
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.26,
          ease: "power1.out",
          clearProps: "opacity",
        }
      )
      return
    }

    gsap.set(card, { left: box.left, top: box.top, transformOrigin: origin })
    gsap.fromTo(
      card,
      { autoAlpha: 0, y: side === "bottom" ? -6 : 6, scale: 0.96 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.26, ease: "power3.out" }
    )
    gsap.fromTo(
      card.querySelectorAll("[data-card-part]"),
      { opacity: 0, y: 4 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        delay: 0.04,
        stagger: 0.035,
        ease: "power2.out",
        clearProps: "opacity,transform",
      }
    )
    const image = card.querySelector("[data-card-image]")
    if (image) {
      gsap.fromTo(
        image,
        { scale: 1.08 },
        { scale: 1, duration: 0.7, ease: "power2.out", clearProps: "transform" }
      )
    }
  }, [active, brokenImage, close])

  const onCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const anchor = activeRef.current?.anchor
    if (
      !anchor ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return
    }
    // Hand the click to the real link, so client-side routing and outbound
    // tracking behave exactly as if it had been clicked
    e.preventDefault()
    close(false)
    anchor.click()
  }

  if (!active) return null

  return createPortal(
    <Card
      ref={cardRef}
      active={active}
      showImage={active.data.image !== brokenImage}
      onImageError={() => setBrokenImage(active.data.image ?? null)}
      onClick={onCardClick}
    />,
    document.body
  )
}

export default LinkPreview
