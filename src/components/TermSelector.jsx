import React from 'react';

const TermSelector = ({ selectedTerm, setSelectedTerm }) => {
    const terms = ['Fall', 'Winter', 'Spring'];

    return (
        <div className="d-flex justify-content-center my-3">
            {terms.map(term => (
                <button
                    key={term}
                    className={`btn btn-${selectedTerm === term ? 'secondary' : 'outline-secondary'} mx-2`}
                    onClick={() => setSelectedTerm(term)}
                >
                    {term}
                </button>
            ))}
        </div>
    );
};

export default TermSelector;
