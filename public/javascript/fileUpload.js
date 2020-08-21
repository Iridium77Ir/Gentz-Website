const rootStyles = window.getComputedStyle(document.documentElement)
if (rootStyles.getPropertyValue('--image-width-large') != null && rootStyles.getPropertyValue('--image-width-large') !== '') {
  ready()
} else {
  document.getElementById('main-css').addEventListener('load', (event) => {
    ready()
  })
}

function ready() {
  const coverWidth = parseFloat(rootStyles.getPropertyValue('--image-width-large'))
  const coverAspectRatio = parseFloat(rootStyles.getPropertyValue('--image-aspect-ratio'))
  const coverHeight = coverWidth / coverAspectRatio
  FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
  )

  FilePond.setOptions({
    allowImageResize: true,
    imageREsizeMode: "force",
    stylePanelAspectRatio: 1 / coverAspectRatio,
    imageResizeTargetWidth: coverWidth,
    imageResizeTargetHeight: coverHeight
  })
  
  FilePond.parse(document.body)
}