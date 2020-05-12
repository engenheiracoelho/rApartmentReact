import React from 'react'

const CommonArea = ({commonArea}) => {
    return (
        <div>
            <center><h1>Common Area List</h1></center>
            {commonArea.map((commonArea) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{commonArea.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{commonArea.location}</h6>
                        <p class="card-text">{commonArea.extraCost.id}</p>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default CommonArea