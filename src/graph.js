
import { useState, useEffect } from "react";
import {Line, LineChart, Tooltip} from 'recharts';

/* class Stock extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            stockChartXValues: [],
            stockChartYValues: []
        }
    }
    componentDidMount(){
        this.fetchStock();
    }
    fetchStock(){
        const pointerToThis = this;
        console.log(pointerToThis);
        const API_KEY = 'aa8707718a8e9f89c698d1e32a734def';
        const StockSymbol = 'AMZN';
        let API_Call = `http://api.marketstack.com/v1/eod?access_key=${API_KEY}&symbols=${StockSymbol}`;
        let stockChartXValuesFunc = [];
        let stockChartYValuesFunc = [];
        fetch(API_Call)
        .then(
            function(response){
                return response.json();
            }
        )
        .then(
            function(data){
                console.log(data);
                for(var key in data['data']){
                    stockChartXValuesFunc.push(data['data'][key]['date']);
                    stockChartYValuesFunc.push(data['data'][key]['adj_close']);
                }
                pointerToThis.setState({
                    stockChartXValues: stockChartXValuesFunc,
                    stockChartYValues: stockChartYValuesFunc
                });
            }
        )
    }
    render(){
        return(
        <div>
            <h1>Stock market</h1>
            </div>
            )
    }
} */
function CustomTooltip(props) {
    var price = ""
    var date = ""
    console.log(props)

    if (props.data[props.label]) {
        price = props.data[props.label]["adj_close"]
        
        date = props.data[props.label]["date"]
        console.log("price",price);
        console.log("date",date);
    }



    return (
        <div>
            <div >{date} </div>
            <div style={{ color: "rgb(0,200,5)"}}> $ {price}</div>
            
        </div>
    )

}

export default function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const data = [];
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        const API_KEY = 'aa8707718a8e9f89c698d1e32a734def';
        const StockSymbol = 'AMZN';
    fetch(`http://api.marketstack.com/v1/eod?access_key=${API_KEY}&symbols=${StockSymbol}`)
    .then(res => res.json())
    .then(
    (result) => {
        for (var instance in result["data"] ) {
            var mydata = (result["data"][instance])
            mydata.date= instance
            data.push(mydata)
           

        }
    setItems(data.reverse())
    },
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
    (error) => {
    setIsLoaded(true);
    setError(error);
    }
    )
    }, [])
    return (
    <div>
    <LineChart width={500} height={250} margin={{ top: 150, right: 30, left: 20, bottom: 5 }} data={items}>
    <Line dot={false}  type="monotone" dataKey="adj_close" stroke="rgb(0,200,5)" yAxisId="100" />
    <Tooltip content={<CustomTooltip data={items} />} />
    </LineChart>
    </div>
    )
    }


//export default Stock;