const axios = require('axios');

/**
 * 
 * @param {type} fetchType people, planets 
 * @param {*} pageIndex current page Index
 * @returns array results
 */

const fetchSWData = async (type, pageIndex) => {
    try {
        let API_URL = process.env.SWAPI_URL + type;
        if (pageIndex && pageIndex > 0) {
            API_URL += '?page=' + pageIndex;
        }
        const { data } = await axios.get(API_URL);
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * 
 * @param {url} residentURL
 * @returns resident data
 */

const fetchResident = async (url) => {
    try {
        const { data: { name } } = await axios.get(url);
        return name;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    fetchSWData,
    fetchResident,
}