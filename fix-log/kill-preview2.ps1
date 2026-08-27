$c = Get-NetTCPConnection -LocalPort 4173 -State Listen -ErrorAction SilentlyContinue
if ($c) {
  $pid = $c.OwningProcess
  Stop-Process -Id $pid -Force
  Write-Host "killed listener PID $pid"
} else {
  Write-Host "no listener found"
}
