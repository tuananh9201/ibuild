REM @echo off
cd C:\ibuild\frontend
cd C:\backend
echo %CD%
timeout /t 5 /nobreak
call C:\ProgramData\Anaconda3\envs\ibuild\Scripts\uvicorn app.main:app --host 0.0.0.0 --port 9099 --reload