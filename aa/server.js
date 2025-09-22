const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = 3000;


app.use(cors()); 
app.use(express.json()); 

const MOCK_VALID_TOKEN = 'secure_user_token_12345';


function protectRoute(req, res, next) {
  
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null;

    if (!token || token !== MOCK_VALID_TOKEN) {
        
        return res.status(401).json({ message: 'Access Denied: Invalid or missing authentication token.' });
    }
    
   
    req.user = { id: 'U1234', email: 'investor@example.com' }; 
    next(); 
}

    
    const mockData = {
        fundId: fundId,
        name: fundId === 'EQ001' ? 'Equity Growth Fund' : 'Debt Income Fund',
        history: [
            { date: '2023-09-01', nav: 100.00 },
            { date: '2024-01-01', nav: 110.50 },
            { date: '2024-09-20', nav: 125.75 }
        ],
        message: 'Data successfully retrieved from API.'
    };

res.json(mockData); 


app.get('/api/user/dashboard', protectRoute, (req, res) => {
   
    const portfolio = {
        totalValue: 550000.00,
        investments: [
            { fund: 'Equity Fund A', units: 500, currentNav: 125.75, gain: 15.75 },
            { fund: 'Debt Fund B', units: 1000, currentNav: 50.25, gain: 8.05 }
        ],
        lastUpdate: new Date().toLocaleString()
    };
    res.json(portfolio);
});



app.listen(PORT, () => {
    console.log(`Backend Server running on http://localhost:${PORT}`);
    console.log('Use FUND_FRONTEND.html to test API calls.');
});