import {Button, Input, Row, Select} from "antd";
import styles from '../../assets/css/components/money-transfer.module.css';
import {useState} from "react";
import {DateTime} from "luxon";


interface Transfer {
	recipient: string;
	date: DateTime;
	sum: string;
}


interface MoneyTransferProps {
	recipients?: Array<Recipient>;
	addTransfer: (transfer: Transfer) => void;
}

interface Recipient {
	value: string;
	label: string;
}

const MoneyTransfer = ({recipients, addTransfer}: MoneyTransferProps) => {

	const [form, setForm] = useState({
		recipient: "",
		sum: "",
		date: DateTime.now(),
	})

	return (
		<>
			<div className={styles.moneyTransfer}>
				<Row>
					<label
						htmlFor="recipient"

						className={styles.moneyTransfer__label}>
						Получатель:
					</label>
					<Select
						id="recipient"
						value={form.recipient}
						onChange={(e) => setForm({...form, recipient: e})}
						style={{width: '100%', marginBottom: '15px'}}
						defaultValue="lucy"
						placeholder="Выберите из списка или введите номер"
						options={recipients || []}
					/>
					<label
						htmlFor="sum"
						className={styles.moneyTransfer__label}>
						Сумма:
					</label>
					<Input
						id="sum"
						style={{width: '100%', marginBottom: '15px'}}
						value={form.sum}
						onChange={(e) => setForm({...form, sum: e?.target?.value})}
						defaultValue="0"/>
				</Row>
				<Row justify="space-around">
					<Button
						onClick={() => addTransfer({date: DateTime.now(), sum: form.sum, recipient: form.recipient})}
						style={{backgroundColor: '#061178', color: '#ffffff', border: 'none'}}
					>
						Перевести
					</Button>
					<Button>Отмена</Button>
				</Row>
			</div>
		</>
	)
}

export default MoneyTransfer;