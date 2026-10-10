# Build-time download only; the app uses these bundled files offline.
$ErrorActionPreference = 'Stop'
$assetRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../public/images/planets'))
$assets = @{
  mercury = '2024/03/pia15162-mercury-basins-messenger-16x9-1.jpg'
  venus = '2024/03/venus-mariner-10-pia23791-fig2-16x9-1.jpg'
  earth = '2024/03/blue-marble-apollo-17-16x9-1.jpg'
  mars = '2024/03/mars-full-globe-16x9-1.jpg'
  jupiter = '2024/03/jupiter-marble-pia22946-16x9-1.jpg'
  saturn = '2023/05/saturn-farewell-pia21345-sse-banner-1920x640-1.jpg'
  uranus = '2024/03/uranus-pia18182-16x9-1.jpg'
  neptune = '2024/03/pia01492-neptune-full-disk-16x9-1.jpg'
}
foreach ($asset in $assets.GetEnumerator()) {
  $uri = 'https://science.nasa.gov/wp-content/uploads/' + $asset.Value + '?w=1024'
  Invoke-WebRequest -Uri $uri -OutFile (Join-Path $assetRoot ($asset.Key + '.jpg')) -TimeoutSec 30
  Write-Output ('Downloaded ' + $asset.Key)
}
