<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { useNav } from '@slidev/client'

// Configuration - update these for your repo
const REPO = 'pmuir/solo-slides'
const THEME = 'github-dark'

const { currentSlideNo } = useNav()
const containerRef = ref<HTMLDivElement>()
const isReviewMode = ref(false)
const isMinimized = ref(false)

// Check for review mode query parameter
onMounted(() => {
  checkReviewMode()
})

async function checkReviewMode() {
  const urlParams = new URLSearchParams(window.location.search)
  isReviewMode.value = urlParams.get('review') === 'true'
  if (isReviewMode.value) {
    // Wait for Vue to render the container before loading utterances
    await nextTick()
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

function toggleMinimized() {
  isMinimized.value = !isMinimized.value
}
</script>

<template>
  <div v-if="isReviewMode">
    <!-- Minimized state: just a floating button -->
    <button 
      v-if="isMinimized" 
      class="comments-toggle-btn"
      @click="toggleMinimized"
      title="Open comments"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <span class="toggle-badge">Review</span>
    </button>

    <!-- Expanded state: full comment panel -->
    <div v-else class="comments-container">
      <div class="comments-header">
        <span class="review-badge">Review Mode</span>
        <span class="review-hint">Slide {{ currentSlideNo }}</span>
        <button class="minimize-btn" @click="toggleMinimized" title="Minimize">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 14 10 14 10 20"></polyline>
            <polyline points="20 10 14 10 14 4"></polyline>
            <line x1="14" y1="10" x2="21" y2="3"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        </button>
      </div>
      <div ref="containerRef" class="utterances-wrapper"></div>
    </div>
  </div>
</template>

<style scoped>
/* Minimized toggle button */
.comments-toggle-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background: #667eea;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  z-index: 100;
  transition: all 0.2s ease;
}

.comments-toggle-btn:hover {
  background: #5a67d8;
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.5);
}

.toggle-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ed64a6;
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 8px;
}

/* Expanded container */
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
  flex: 1;
}

.minimize-btn {
  background: transparent;
  border: none;
  color: #718096;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.minimize-btn:hover {
  background: #e2e8f0;
  color: #4a5568;
}

.utterances-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  min-height: 200px;
}

/* Style the utterances iframe */
.utterances-wrapper :deep(.utterances) {
  max-width: 100%;
}

.utterances-wrapper :deep(.utterances-frame) {
  min-height: 180px;
}

/* Dark mode support */
.dark .comments-toggle-btn {
  background: #667eea;
}

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

.dark .minimize-btn {
  color: #a0aec0;
}

.dark .minimize-btn:hover {
  background: #4a5568;
  color: #e2e8f0;
}
</style>
