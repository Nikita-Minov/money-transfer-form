import {Button, Input, Row, Select} from "antd";
import styles from '../../assets/css/components/money-transfer.module.css';

const MoneyTransfer = () => {

	const recipients = [
		{ value: 'Иванов Иван', label: 'Иванов Иван' },
		{ value: 'Петров Пётр', label: 'Петров Пётр' },
	];

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
						style={{width: '100%', marginBottom: '15px'}}
						defaultValue="lucy"
						placeholder="Выберите из списка или введите номер"
						options={recipients}
					/>
					<label
						htmlFor="sum"
						className={styles.moneyTransfer__label}>
						Сумма:
					</label>
					<Input id="sum" style={{width: '100%', marginBottom: '15px'}} defaultValue="0"/>
				</Row>
				<Row justify="space-around">
					<Button style={{backgroundColor: '#061178', color: '#ffffff', border: 'none'}}>Перевести</Button>
					<Button>Отмена</Button>
				</Row>
			</div>
		</>
	)
}

export default MoneyTransfer;