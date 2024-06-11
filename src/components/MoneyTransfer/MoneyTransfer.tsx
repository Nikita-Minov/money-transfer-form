import {Button, Input, Row, Select, Typography} from "antd";
import styles from '../../assets/css/components/money-transfer.module.css';
import {DateTime} from "luxon";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
const { Text } = Typography;
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";


interface Transfer {
	recipient: string;
	date: string;
	sum: number;
}


interface MoneyTransferProps {
	recipients?: Array<Recipient>;
	addTransfer: (transfer: Transfer) => void;
	recipient: {
		value: string;
		label: string;
	};
	sum: number;
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

	const validationSchema = yup.object().shape({
		recipient: yup.string().required("Поле обязательно для заполнения"),
		sum: yup.string().matches(/^-?(0|[1-9]\d*)$/, 'Некорректное значение').required("Поле обязательно для заполнения")
	}).required();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			recipient: recipient.value,
			sum: sum.toString(),
		},
		mode: 'onChange'
	});
	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		addTransfer({date: DateTime.now().toFormat('dd.LL.yyyy'), sum: +data.sum, recipient: data.recipient})
	}

	return (
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
						style={{width: '100%', marginBottom: errors.recipient ? '5px' : '15px'}}
						placeholder="Выберите из списка или введите номер"
						{...field}
						options={recipients || []}
					/>
				}
				/>
				{errors.recipient && <Text className={styles.moneyTransfer__errorLabell} type="danger">{errors.recipient.message}</Text>}
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
						style={{width: '100%', marginBottom: errors.sum ? '5px' : '15px'}}
						{...field}
					/>}
				/>
				{errors.sum && <Text className={styles.moneyTransfer__errorLabell} type="danger">{errors.sum.message}</Text>}
			</Row>
			<Row justify="space-around">
					<Button
						htmlType='submit'
						className={styles.moneyTransfer__btn}
					>
						Перевести
					</Button>
				<Button>Отмена</Button>
			</Row>
		</form>
	)
}

export default MoneyTransfer;