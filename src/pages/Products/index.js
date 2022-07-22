import './Products.css'
import ProductCard from '../../components/ProductCard'
import { useEffect, useState } from 'react'

const Products = ({ data, setData, originalData }) => {
    const [filterOptions, setFilterOptions] = useState([])
    const [typeFilter, setTypeFilter] = useState(null)
    const [colorFilter, setColorFilter] = useState(null)
    const [priceFilter, setPriceFilter] = useState(null)
    const [genderFilter, setGenderFilter] = useState(null)
    const [loading, setLoading] = useState(false)

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
        setData(originalData);
        // eslint-disable-next-line
    },[])

    const filterResults = () => {
        setLoading(true)
        // filter data based on filter options
        const filteredData = originalData.filter(item => {
            if (typeFilter && item.type !== typeFilter) {
                return false
            }
            if (colorFilter && item.color !== colorFilter) {
                return false
            }
            if (priceFilter && ((item.price < priceFilter?.minValue) || (item.price > priceFilter?.maxValue))) {
                return false
            }
            if (genderFilter && item.gender !== genderFilter) {
                return false
            } else return item
        })
        setData(filteredData)
        setLoading(false)
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
                <button className='apply-filter-btn' onClick={filterResults} disabled={!typeFilter && !colorFilter && !priceFilter && !genderFilter}>Apply Filter</button>
            </div>
            <div className="products-container">
            {loading ? 
                    <div>Loading...</div> : 
                    data.length === 0 ? 
                        <div className='no-results'>No results found ☹️</div> :
                        data.map((item) => (
                        <ProductCard 
                            key={item.id} 
                            item={item}
                        />))}
            </div>
        </div>   
    </div>
  )
}

export default Products