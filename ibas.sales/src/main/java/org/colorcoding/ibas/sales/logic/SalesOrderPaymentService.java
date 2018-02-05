package org.colorcoding.ibas.sales.logic;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.sales.bo.salesorder.ISalesOrder;
import org.colorcoding.ibas.sales.bo.salesorder.SalesOrder;

/**
 * 销售订单-付款服务
 * 
 * @author Niuren.Zhu
 *
 */
@LogicContract(ISalesOrderPaymentContract.class)
public class SalesOrderPaymentService extends SalesOrderService<ISalesOrderPaymentContract> {

	@Override
	protected boolean checkDataStatus(Object data) {
		if (data instanceof ISalesOrderPaymentContract) {
			ISalesOrderPaymentContract contract = (ISalesOrderPaymentContract) data;
			if (!SalesOrder.BUSINESS_OBJECT_CODE.equals(contract.getDocumentType())) {
				Logger.log(MessageLevel.DEBUG, MSG_LOGICS_SKIP_LOGIC_EXECUTION, this.getClass().getName(),
						"DocumentType", contract.getDocumentType());
				return false;
			}
		}
		return super.checkDataStatus(data);
	}

	@Override
	protected ISalesOrder fetchBeAffected(ISalesOrderPaymentContract contract) {
		return this.fetchBeAffected(contract.getDocumentType(), contract.getDocumentEntry());
	}

	@Override
	protected void impact(ISalesOrderPaymentContract contract) {
		if (this.getBeAffected() == null) {
			return;
		}
		Decimal paidTotal = this.getBeAffected().getPaidTotal();
		if (paidTotal == null) {
			paidTotal = Decimal.ZERO;
		}
		paidTotal = paidTotal.add(contract.getAmount());
		this.getBeAffected().setPaidTotal(paidTotal);
	}

	@Override
	protected void revoke(ISalesOrderPaymentContract contract) {
		if (this.getBeAffected() == null) {
			return;
		}
		Decimal paidTotal = this.getBeAffected().getPaidTotal();
		if (paidTotal == null) {
			paidTotal = Decimal.ZERO;
		}
		paidTotal = paidTotal.subtract(contract.getAmount());
		this.getBeAffected().setPaidTotal(paidTotal);
	}

}