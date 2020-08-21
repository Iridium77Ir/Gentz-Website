const rootStyles = window.getComputedStyle(document.documentElement)
if (rootStyles.getPropertyValue('--memberimage-width-large') != null && rootStyles.getPropertyValue('--memberimage-width-large') !== '') {
  ready()
} else {
  document.getElementById('main-css').addEventListener('load', (event) => {
    ready()
  })
}

function ready() {
  const coverWidth = parseFloat(rootStyles.getPropertyValue('--memberimage-width-large'))
  const coverAspectRatio = parseFloat(rootStyles.getPropertyValue('--memberimage-aspect-ratio'))
  const coverHeight = coverWidth / coverAspectRatio
  FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
    FilePondPluginImageCrop,
    FilePondPluginImageTransform
  )

  FilePond.setOptions({
    allowImageResize: true,
    imageResizeMode: "cover",
    stylePanelAspectRatio: 1 / coverAspectRatio,
    imageResizeTargetWidth: coverWidth,
    imageResizeTargetHeight: coverHeight,
    allowImageCrop: true,
    imageCropAspectRatio: coverAspectRatio,
    allowImageTransform: true
  })
  
  FilePond.parse(document.body)
}