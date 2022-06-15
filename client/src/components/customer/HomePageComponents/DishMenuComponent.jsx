import React from 'react'
import { Card, Col, Button } from "react-bootstrap"
import { API_URL } from '../../../utils/API'
import { numberWithCommas } from '../../../utils/utils'

const DishMenuComponent = (props) => {
    const {listMenu, insertToCart} = props;
    return (
        <Col md={3} className="mb-4">
            <Card className='shadow'>
                <Card.Img variant="top" src={`${API_URL}images/${listMenu.gambar}`}/>
                <Card.Body>
                    <Card.Title>{listMenu.nama}</Card.Title>
                    <Card.Text>
                        Rp. {numberWithCommas(listMenu.harga)}
                    </Card.Text>
                    <Button variant="dark" className="w-100" onClick={() => insertToCart(listMenu)}>Pesan</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default DishMenuComponent