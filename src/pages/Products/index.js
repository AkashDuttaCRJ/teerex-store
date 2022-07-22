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
    const [searchTerm, setSearchTerm] = useState('')
    const [showMobileFilter, setShowMobileFilter] = useState(false)

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
        const closeModal = () => {
            setShowMobileFilter(false)
        }
        document.addEventListener('click', closeModal)

        return () => document.removeEventListener('click', closeModal)
        // eslint-disable-next-line
    },[])

    useEffect(() => {
      searchTerm === '' && setData(originalData)
      // eslint-disable-next-line
    }, [searchTerm])
    

    const filterResults = () => {
        setLoading(true)
        // filter data based on filter options
        const filteredData = searchTerm === '' ? originalData.filter(item => {
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
        }) : data.filter(item => {
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

    const getSearchResult = () => {
        const searchResults = originalData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setData(searchResults)
    }

  return (
    <div className='products-page'>
        <div className="search-container">
            <div className="search-input-container">
                <input 
                    type="text" 
                    placeholder="Search for products..." 
                    className="search-input" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    onKeyUp={(e) => e.key === 'Enter' && getSearchResult()} 
                />
                {searchTerm !== '' && <button className="cross-button" onClick={() => setSearchTerm('')}>
                    <img src='assets/bx-x.svg' alt='' />
                </button>}
                <button className="search-button" onClick={getSearchResult}>
                    <img src='assets/bx-search.svg' alt='' />
                </button>
                <button className="filter-button mobile" onClick={(e) => {
                    e.stopPropagation()
                    setShowMobileFilter(!showMobileFilter)
                    }}>
                    <img src='assets/bx-filter-alt.svg' alt='' />
                </button>
                {showMobileFilter && <div className='mobile-filters-container' onClick={(e) => e.stopPropagation()}>
                    <div className='filter-header'>
                        <div className='filter-header-label'>Filters</div>
                        <div className='filter-clear-btn' onClick={() => {
                            setTypeFilter(null)
                            setColorFilter(null)
                            setPriceFilter(null)
                            setGenderFilter(null)
                            setData(originalData)
                            setSearchTerm('')
                            setShowMobileFilter(false)
                        }}>Clear all</div>
                    </div>
                    {filterOptions.map((item, index) => (
                        <div className='filter-group' key={index}>
                            <div className="filter-label">{item.label}</div>
                            {item.values.map((value, index) => (
                                item.label === 'Price' ?
                                <div className="filter-mobile-item">
                                    <label htmlFor={JSON.stringify(value)}>
                                        <input type='radio' value={JSON.stringify(value)} checked={JSON.stringify(priceFilter) === JSON.stringify(value)} id={JSON.stringify(value)} name={item.label} onChange={((e) => setPriceFilter(JSON.parse(e.target.value)))} />
                                        <div className="filter-mobile-item-label">{`Rs${value.minValue} - Rs${value.maxValue}`}</div>
                                    </label>
                                </div> :
                                <div className="filter-mobile-item">
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
                                        <div className="filter-mobile-item-label">{value}</div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button className='apply-filter-btn' onClick={() => {
                        filterResults()
                        setShowMobileFilter(false)
                    }} disabled={!typeFilter && !colorFilter && !priceFilter && !genderFilter}>Apply Filter</button>
                </div>}
            </div>
        </div>
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
                        setSearchTerm('')
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