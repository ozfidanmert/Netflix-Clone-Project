import React from 'react';
import './PageComp.css';

const PageComp = ({ 
    setMovieActivePage, 
    movieActivePage, 
    tvActivePage, 
    setTvActivePage,
    searchActivePage,
    setSearchActivePage,
    popularListActivePage,
    setPopularListActivePage,
    totalPages 
}) => {
    // Aktif sayfa ve ayarlayıcı fonksiyon seçimi
    const activePage = movieActivePage ?? tvActivePage ?? searchActivePage ?? popularListActivePage;
    const setActivePage = setMovieActivePage ?? setTvActivePage ?? setSearchActivePage ?? setPopularListActivePage;

    const inputChange = (e) => {
        const value = Number(e.target.value);

        if (value <= 0 || isNaN(value) || value > totalPages) {
            setActivePage(1);
        } else {
            setActivePage(value);
        }
    };

    return (
        <div className="pages">
            <div className="pages-content">
                <button onClick={() => setActivePage(1)}>{`< 1`}</button>
                <button
                    onClick={() =>
                        activePage > 1 ? setActivePage(activePage - 1) : null
                    }
                    className="prev"
                >
                    Prev
                </button>

                <div className="info-page">
                    <input 
                        onChange={(e) => inputChange(e)} 
                        value={activePage} 
                        type="text" 
                    /> 
                    <span className="of"> of</span> 
                    <p>{totalPages}</p>
                </div>

                <button
                    onClick={() =>
                        activePage < totalPages ? setActivePage(activePage + 1) : null
                    }
                    className="next"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PageComp;
