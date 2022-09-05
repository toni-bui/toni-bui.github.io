'use strict';

function subscribe(eventName, listener) {
	document.addEventListener(eventName, listener);
}

function unsubscribe(eventName, listener) {
	document.removeEventListener(eventName, listener);
}

function publish(eventName, data) {
	const event = new CustomEvent(eventName, { detail: data });
	document.dispatchEvent(event);
}

function Timer() {

	const [timer, setTimer] = React.useState(5);

	React.useEffect(() => {
		if (timer == 0) {
			publish("countDown", {});
		}
	}, [timer]);

	React.useEffect(() => {
		const interval = setInterval(() => {
			setTimer((prevTimer) => {
				let _timer = prevTimer - 1;
				if (_timer == -1) {
					_timer = 5;
				}
				return _timer;
			});
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (<div id="timer">{timer}</div>)
}

function Number(props) {

	const [number, setNumber] = React.useState(0);

	React.useEffect(() => {
		subscribe("countDown", () => {
			setNumber(Math.floor(Math.random() * 11) + 2);
		});
		return () => {
			unsubscribe("countDown");
		}
	})

	return (<div id="{props.id}" className="Nummber">{number}</div>)
}

function App() {
	return (
		<div>
			<Timer />
			<div className="container">
				<div className="flex-container">
					<Number id="no1" />
					<div className="sign">x</div>
					<Number id="no2" />
				</div>
			</div>
		</div>
  )	;
}

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(App));

screen.orientation.lock('landscape');
