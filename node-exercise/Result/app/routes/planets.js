const express = require('express');
const router = express.Router();

const { fetchSWData, fetchResident } = require('../utils')

router.get('/', async (req, res) => {
    let planets = [];
    let pageIndex = 1;
    let residents = {};
    do{
        const chunks = await fetchSWData('planets', pageIndex);
        if (chunks && chunks.results){
            await Promise.all(chunks.results.map(async (item) =>{
                if (item.residents){
                    for (let i = 0; i < item.residents.length; i++){
                        if (!residents[item.residents[i]]){
                            const resident = await fetchResident(item.residents[i])
                            item.residents[i] = resident
                            residents[item.residents[i]] = resident;
                        }
                        else {
                            item.residents[i] = residents[item.residents[i]];
                        }
                    }
                }
            }));
            if (chunks && chunks.results) planets = planets.concat(chunks.results);
        }
        if (!chunks.next){
            pageIndex = -1;
        }
        else pageIndex++;
    }
    while(pageIndex > 0);
    
    return res.status(200).json({
        success: 1,
        message: 'success',
        data: planets
    });
});

module.exports = router;