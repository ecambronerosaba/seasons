import React from 'react';
import ReactDOM from 'react-dom'
import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner';

class App extends React.Component {
    // // Not required by React
    // constructor(props) {
    //     // Required to call setup React.Component
    //     // Subclassing it!
    //     super(props);

    //     // ONLY EXCEPTION TO THE RULE 
    //     // Can only do direct assignment for this
    //     this.state = { lat: null, errorMessage: '' };
    // }

    // Can replace constructor with this totally equivalent!
    state = { lat: null, errorMessage: '' };

    componentDidMount() {
        // Don't want to call in render to refetch
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                // We called setState
                this.setState({ lat: position.coords.latitude });
                // CANNOT DO this.state.lat = position.coords.latitude
            },
            (err) => {
                this.setState({ errorMessage: err.message });
            }
        );
    }

    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage} </div>;
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat}/>;
        }
        return <Spinner text = "Please allow location access!"/>;
    }

    // React says we have to define render!!
    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);