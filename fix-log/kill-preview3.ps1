$c = Get-NetTCPConnection -LocalPort 4173 -State Listen -ErrorAction SilentlyContinue
if ($c) {
  $procId = $c.OwningProcess
  Stop-Process -Id $procId -Force
  Write-Host "killed listener PID $procId"
} else {
  Write-Host "no listener found"
}
