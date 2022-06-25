import './Products.css'
import ProductCard from '../../components/ProductCard'
import { useEffect, useState } from 'react'

const Products = ({ data, setData, originalData }) => {
    const [filterOptions, setFilterOptions] = useState([])
    const [typeFilter, setTypeFilter] = useState(null)
    const [colorFilter, setColorFilter] = useState(null)
    const [priceFilter, setPriceFilter] = useState(null)
    const [genderFilter, setGenderFilter] = useState(null)

    const getColour = (dataset) => {
        const colors = []
        for (var i = 0; i < dataset.length; i++) {
            !colors.includes(dataset[i].color) && colors.push(dataset[i].color)
        }
        return colors
    }

    const getGender = (dataset) => {
        const genders = []
        for (var i = 0; i < dataset.length; i++) {
            !genders.includes(dataset[i].gender) && genders.push(dataset[i].gender)
        }
        return genders
    }

    const getType = (dataset) => {
        const types = []
        for (var i = 0; i < dataset.length; i++) {
            !types.includes(dataset[i].type) && types.push(dataset[i].type)
        }
        return types
    }

    const getPrice = (dataset) => {
        const prices = []
        var maxPrice = 0
        for (var i = 0; i < dataset.length; i++) {
            maxPrice = maxPrice > dataset[i].price ? maxPrice : dataset[i].price
        }
        const no_of_items = Math.ceil(maxPrice/250)
        for (var j = 0; j < no_of_items; j++){
            const minValue = j === 0 ? 0 : j * 250 + 1
            const maxValue = (j + 1) * 250 > maxPrice ? maxPrice : (j + 1) * 250
            prices.push({ minValue, maxValue })
        }
        return prices
    }
    
    useEffect(() => {
        const filters = [
            {
                'label': 'Type',
                'values': getType(originalData)
            },
            {
                'label': 'Colour',
                'values': getColour(originalData)
            },
            {
                'label': 'Price',
                'values': getPrice(originalData)
            },
            {
                'label': 'Gender',
                'values': getGender(originalData)
            }
        ]

        setFilterOptions(filters);
    },[])

    const filterResults = () => {
        if (typeFilter !== null) {
            const typeFilterRes = originalData.filter((item) => item.type === typeFilter)
            setData(typeFilterRes)
        }
        if (colorFilter !== null) {
            const colorFilterRes = originalData.filter((item) => item.color === colorFilter)
            setData(colorFilterRes)
        }
        if (priceFilter !== null) {
            const priceFilterRes = originalData.filter((item) => priceFilter.minValue <= item.price && item.price <= priceFilter.maxValue)
            setData(priceFilterRes)
        }
        if (genderFilter !== null) {
            const genderFilterRes = originalData.filter((item) => item.gender === genderFilter)
            setData(genderFilterRes)
        }
    }

    console.log(typeFilter, colorFilter, priceFilter, genderFilter);

  return (
    <div className='products-page'>
        <div className="search-container"></div>
        <div className="results-container">
            <div className="filter-container">
                <div className='filter-header'>
                    <div className='filter-header-label'>Filters</div>
                    <div className='filter-clear-btn' onClick={() => {
                        setTypeFilter(null)
                        setColorFilter(null)
                        setPriceFilter(null)
                        setGenderFilter(null)
                        setData(originalData)
                    }}>Clear all</div>
                </div>
                {filterOptions.map((item, index) => (
                    <div key={index} className='filter-group'>
                        <div className='filter-label'>{item.label}</div>
                        {item.values.map((value, idx) => (
                            item.label === 'Price' ? 
                            <div key={idx} className='filter-item'>
                                <label htmlFor={JSON.stringify(value)}>
                                    <input type='radio' value={JSON.stringify(value)} checked={JSON.stringify(priceFilter) === JSON.stringify(value)} id={JSON.stringify(value)} name={item.label} onChange={((e) => setPriceFilter(JSON.parse(e.target.value)))} />
                                    {`Rs${value.minValue} - Rs${value.maxValue}`}
                                </label>
                            </div>:
                            <div key={idx} className='filter-item'>
                                <label htmlFor={value}>
                                    <input 
                                    type='radio' 
                                    value={value} 
                                    id={value} 
                                    name={item.label} 
                                    checked={(item.label === 'Type' && (typeFilter === value)) || (item.label === 'Colour' && (colorFilter === value)) || (item.label === 'Gender' && (genderFilter === value))}
                                    onChange={(e) => {
                                        if (item.label === 'Type') setTypeFilter(e.target.value)
                                        if (item.label === 'Colour') setColorFilter(e.target.value)
                                        if (item.label === 'Gender') setGenderFilter(e.target.value)
                                    }} />
                                    {value}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
                <button onClick={filterResults}>Apply Filter</button>
            </div>
            <div className="products-container">
                {data.map((item) => (
                <ProductCard 
                    key={item.id} 
                    imgSrc={item.imageURL} 
                    name={item.name} 
                    currency={item.currency} 
                    price={item.price}
                    maxUnit={item.quantity}
                />))}
            </div>
        </div>   
    </div>
  )
}

export default Products