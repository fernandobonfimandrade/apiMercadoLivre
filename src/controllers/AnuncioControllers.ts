import { Request, Response } from 'express';
import axios from "axios";

interface Anuncio {
    id: String,
    site_id: String,
    title: String,
    seller: [],
    price: Number,
    prices: [],
    sale_price: null,
    currency_id: String,
    available_quantity: Number,
    sold_quantity: Number,
    buying_mode: String,
    listing_type_id: String,
    stop_time: String,
    condition: String,
    permalink: String,
    thumbnail: String,
    thumbnail_id: String,
    address: [],
    shipping: [],
    seller_address: [],
    seller_contact: [],
    location: [],
    attributes: [],
    original_price: Number,
    category_id: String,
    official_store_id: Number,
    domain_id: String,
    catalog_product_id: Number,
    tags: [],
    order_backend: Number,
    use_thumbnail_id: Number
}

export default {

    async find(request: Request, response: Response) {
        const { produto } = request.params;
        const categoria = 'MLB1763';
        const estate = '&state=BR-SP';
        const itu = 'BR-SP-62'
        const salto = 'BR-SP-63'
        const sorocaba = 'BR-SP-42'
        const campinas = 'BR-SP-29'
        const city = '&city='+sorocaba+','+campinas+','+salto+','+itu;
        const buscar = produto;
        const token = 'pVsQsi19QpX0j8Xj1eEOcv7LvVGijKG7';
        axios.defaults.headers.authorization = `Bearer ${token}`;
        const responsed = await axios.get(`https://api.mercadolibre.com/sites/MLB/search?q=${buscar}&category=${categoria}&status=active&orders=start_time_desc${estate}${city}`);
        console.log(responsed.data.results);
        const anuncios = responsed.data.results.map(anuncio => {
            return { 
                'id': anuncio.id, 
                'price': anuncio.price, 
                'title': anuncio.title, 
                'permalink': anuncio.permalink, 
                'thumbnail': anuncio.thumbnail, 
                'location': anuncio.address.city_name + '/' + anuncio.address.state_name, 
                'stop_time': anuncio.stop_time 
            }
        })
        return response.send(anuncios);
    }
}