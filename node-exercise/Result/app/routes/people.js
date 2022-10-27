const express = require('express');
const router = express.Router();

const { fetchSWData } = require('../utils')

router.get('/', async (req, res) => {
    let sortBy = null
    if (req.query.sortBy === 'name' || req.query.sortBy === 'height' || req.query.sortBy === 'mass'){
        sortBy = req.query.sortBy;
    }
    let people = [];
    let pageIndex = 1;
    do{
        const chunks = await fetchSWData('people', pageIndex);
        if (chunks && chunks.results) people = people.concat(chunks.results);
        if (!chunks.next){
            // if next is null, then exit loop
            pageIndex = -1;
        }
        else pageIndex++;
    }
    while(pageIndex > 0);
    if (sortBy){
        people = people.sort((a, b) => {
            if (b[sortBy] === 'unknown' && a[sortBy] === 'unknown') return 0;
            else if (b[sortBy] === 'unknown') return -1;
            else if (a[sortBy] === 'unknown') return 1;
            return b[sortBy] - a[sortBy];
        })
    }
    return res.status(200).json({
        success: 1,
        message : 'success',
        data: people
    });
});

module.exports = router;