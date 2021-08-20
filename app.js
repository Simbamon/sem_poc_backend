const express = require('express')
const app = express()
const port = 5000
const path = require('path')
const fetch = require('node-fetch')


require('dotenv').config({ path: path.resolve(__dirname, './.env') })
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const cp4durl = process.env.URL
const Token = process.env.TOKEN
const uname = process.env.USERNAME
const password = process.env.PASSWORD


const LoadData = async () => {
    try{
        const url = cp4durl + `icp4d-api/v1/authorize`
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                "Cache-Control": "no-cache",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: uname,
                password: password
            })
        });
        console.log(res.ok);
        const data = await res.text();
        // console.log(data);
        const obj = await JSON.parse(data)
        const token = await obj['token']
        // console.log(token)
    }catch(err) {
        console.error(err)
    }
}

app.get("/getcatalogs", async (req, res) => {
    console.log("/getcatalog endpoint called")
    const url = cp4durl + `v2/catalogs`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + Token
        }
    })
    .then(res => res.text())
    .catch(e => {
        console.error({
            "message": "Error",
            error: e,
        })
        })
    console.log("RESPONSE: ", response)
    res.send(response)
})

app.get("/getassetlist", async (req, res)=> {
    console.log("Getting asset list...")
    const url = cp4durl + `v2/asset_types/asset/search?catalog_id=e915f391-8dc7-4904-9e22-3c2c7614ac4e`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + Token,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        body: JSON.stringify({
            query: '*:*'
        })
    })
    .then(res => res.text())
    .catch(e => {
        console.error({
            "message": "Error",
            
            error: e,
        })
        })
    console.log("RESPONSE: ", response)
    res.send(response)
})

app.get("/getassetmeta", async (req, res)=> {
    console.log("Getting asset's meta data...")
    const url = cp4durl + `v2/assets/d5b05d69-95af-43df-bf29-1cc1e7b68dad?catalog_id=e915f391-8dc7-4904-9e22-3c2c7614ac4e`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + Token
        }
    })
    .then(res => res.text())
    .catch(e => {
        console.error({
            "message": "Error",
            error: e,
        })
        })
    console.log("RESPONSE: ", response)
    res.send(response)
})

app.get("/getassetreview", async (req, res)=> {
    console.log("Getting asset's review...")
    const url = cp4durl + `v2/assets/d5b05d69-95af-43df-bf29-1cc1e7b68dad/ratings?catalog_id=e915f391-8dc7-4904-9e22-3c2c7614ac4e`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + Token
        }
    })
    .then(res => res.text())
    .catch(e => {
        console.error({
            "message": "Error",
            error: e,
        })
        })
    console.log("RESPONSE: ", response)
    res.send(response)
})

app.get("/getconnection", async (req, res)=> {
    console.log("Getting asset's connection...")
    const url = cp4durl + `/v2/connections/6cbf2c9a-fda9-497e-bbff-e259318074eb?catalog_id=e915f391-8dc7-4904-9e22-3c2c7614ac4e`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + Token
        }
    })
    .then(res => res.text())
    .catch(e => {
        console.error({
            "message": "Error",
            error: e,
        })
        })
    console.log("RESPONSE: ", response)
    res.send(response)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})