<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useNav } from '@slidev/client'

// Configuration - update these for your repo
const REPO = 'pmuir/solo-slides'
const THEME = 'github-dark'

const { currentSlideNo } = useNav()
const containerRef = ref<HTMLDivElement>()
const isReviewMode = ref(false)

// Check for review mode query parameter
onMounted(() => {
  checkReviewMode()
})

function checkReviewMode() {
  const urlParams = new URLSearchParams(window.location.search)
  isReviewMode.value = urlParams.get('review') === 'true'
  if (isReviewMode.value) {
    loadUtterances()
  }
}

// Reload utterances when slide changes
watch(currentSlideNo, () => {
  if (isReviewMode.value) {
    loadUtterances()
  }
})

function loadUtterances() {
  if (!containerRef.value) return
  
  // Clear existing utterances
  containerRef.value.innerHTML = ''
  
  const script = document.createElement('script')
  script.src = 'https://utteranc.es/client.js'
  script.setAttribute('repo', REPO)
  script.setAttribute('issue-term', `slide-${currentSlideNo.value}`)
  script.setAttribute('theme', THEME)
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true
  
  containerRef.value.appendChild(script)
}
</script>

<template>
  <div v-if="isReviewMode" class="comments-container">
    <div class="comments-header">
      <span class="review-badge">Review Mode</span>
      <span class="review-hint">Comments are visible. Remove ?review=true to hide.</span>
    </div>
    <div ref="containerRef" class="utterances-wrapper"></div>
  </div>
</template>

<style scoped>
.comments-container {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 400px;
  max-height: 50vh;
  background: white;
  border-top-left-radius: 8px;
  box-shadow: -4px -4px 20px rgba(0, 0, 0, 0.15);
  z-index: 100;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.comments-header {
  padding: 8px 12px;
  background: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.review-badge {
  background: #667eea;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.review-hint {
  font-size: 11px;
  color: #718096;
}

.utterances-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
}

/* Dark mode support */
.dark .comments-container {
  background: #1a202c;
}

.dark .comments-header {
  background: #2d3748;
  border-color: #4a5568;
}

.dark .review-hint {
  color: #a0aec0;
}
</style>
