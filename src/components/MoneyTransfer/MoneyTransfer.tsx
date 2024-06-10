import {Button, Input, Row, Select, Typography} from "antd";
import styles from '../../assets/css/components/money-transfer.module.css';
import {DateTime} from "luxon";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
const { Text } = Typography;


interface Transfer {
	recipient: string;
	date: DateTime;
	sum: string;
}


interface MoneyTransferProps {
	recipients?: Array<Recipient>;
	addTransfer: (transfer: Transfer) => void;
	recipient: {
		value: string;
		label: string;
	};
	sum: string;
}

interface Recipient {
	value: string;
	label: string;
}

interface IFormInput {
	recipient: string;
	sum: string;
}

const MoneyTransfer = ({recipients, addTransfer, recipient, sum}: MoneyTransferProps) => {

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<IFormInput>({
		defaultValues: {
			recipient: recipient.label || '',
			sum: sum || '',
		},
		mode: 'onChange'
	});
	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		addTransfer({date: DateTime.now(), sum: data.sum, recipient: data.recipient})
		console.log(data);
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.moneyTransfer}>
				<Row>
					<label
						htmlFor="recipient"
						className={styles.moneyTransfer__label}>
						Получатель:
					</label>
					<Controller
						name="recipient"
						control={control}
						render={({ field }) => <Select
							id="recipient"
							{...register('recipient', {
								required: {
									value: true,
									message: 'Поле обязательно для заполнения'
								},
							})}
							style={{width: '100%', marginBottom: errors.recipient ? '5px' : '15px'}}
							placeholder="Выберите из списка или введите номер"
							{...field}
							options={recipients || []}
						/>
					}
					/>
					{errors.recipient && <Text style={{marginBottom: '15px', width: '100%'}} type="danger">{errors.recipient.message}</Text>}
					<label
						htmlFor="sum"
						className={styles.moneyTransfer__label}>
						Сумма:
					</label>
					<Controller
						name="sum"
						control={control}
						render={({ field }) => <Input
							id="sum"
							{...register('sum', {
								required: {
									value: true,
									message: 'Поле обязательно для заполнения'
								},
								pattern: {
									value: /^-?(0|[1-9]\d*)$/,
									message: 'Некорректное значение'
								},
							})}
							style={{width: '100%', marginBottom: errors.sum ? '5px' : '15px'}}
							{...field}
						/>}
					/>
					{errors.sum && <Text style={{marginBottom: '15px', width: '100%'}} type="danger">{errors.sum.message}</Text>}
				</Row>
				<Row justify="space-around">
						<Button
							htmlType='submit'
							style={{backgroundColor: '#061178', color: '#ffffff', border: 'none'}}
						>
							Перевести
						</Button>

					<Button>Отмена</Button>
				</Row>
			</form>
		</>
	)
}

export default MoneyTransfer;