import React, {Component} from 'react'

class CommonArea extends Component<{ commonArea: any }> {
    render() {
        let {commonArea} = this.props;
        return (
            <div>
                <h1>Área comum</h1>
                {commonArea.map((commonArea: any) => {
                    return (
                        <div>
                            <div>
                                <h5>{commonArea.name}</h5>
                                <h6>{commonArea.location}</h6>
                                <p>{commonArea.extraCost.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        )
    }
}

export default CommonArea