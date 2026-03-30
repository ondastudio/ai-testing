import { ref, watch } from 'vue'
import type { Ref } from 'vue'

/**
 * Encapsulates video playback state and controls for a single <video> element.
 * Pass a reactive boolean indicating whether the card/panel is expanded.
 * The video auto-plays (with sound) when expanded and resets when collapsed.
 */
export function useVideoPlayer(expanded: Ref<boolean>) {
  const videoRef      = ref<HTMLVideoElement | null>(null)
  const videoProgress = ref(0)
  const isPlaying     = ref(false)

  function onTimeUpdate() {
    if (!videoRef.value) return
    const { currentTime, duration } = videoRef.value
    if (duration > 0) videoProgress.value = currentTime / duration
  }

  function togglePlay() {
    if (!videoRef.value) return
    videoRef.value.paused ? videoRef.value.play() : videoRef.value.pause()
  }

  // Delay before unmuting and playing after expand animation (ms)
  const PLAY_DELAY_MS = 900

  watch(expanded, (val) => {
    if (!videoRef.value) return
    if (val) {
      videoRef.value.currentTime = 0
      videoProgress.value = 0
      setTimeout(() => {
        if (!videoRef.value) return
        videoRef.value.muted = false
        videoRef.value.play()
      }, PLAY_DELAY_MS)
    } else {
      videoRef.value.pause()
      videoRef.value.muted = true
      videoRef.value.currentTime = 0
      videoProgress.value = 0
    }
  })

  return { videoRef, videoProgress, isPlaying, onTimeUpdate, togglePlay }
}
