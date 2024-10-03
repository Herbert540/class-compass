import React from 'react';

const TermSelector = ({ selectedTerm, setSelectedTerm, openModal }) => {
    const terms = ['Fall', 'Winter', 'Spring'];

    return (
        <div className="d-flex justify-content-between my-3 ps-4 px-4">
            <div className="d-flex">
                {terms.map(term => (
                    <button
                        key={term}
                        className={`btn btn-${selectedTerm === term ? 'secondary' : 'outline-secondary'} mx-1`}
                        onClick={() => setSelectedTerm(term)}
                    >
                        {term}
                    </button>
                ))}
            </div>
            <button className="btn btn-outline-secondary mx-2 px-4" onClick={openModal}>
                Course Plan
            </button>
        </div>
    );
};

export default TermSelector;
