# auth-redirect-demo
A playground to show app connections and redirects

### quick start
- The beckend is Flask
- The frontend is React (10.8.2)
- The database is empty now.

### how to run locally
- Clone the repo
- Install dependencies
```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
npm install
cd patient-portal
npm install
cd ..
cd ai-service
npm install
cd ..
```
- Run frontend and backend. Port is hard coded now
```sh
cd ai-service
npm start
# 3000
cd ..
cd patient-portal
npm start
# 3001
cd ..
cd ai-service-api
python app.py
# 5000
```

- Test at `http://localhost:3001/`
