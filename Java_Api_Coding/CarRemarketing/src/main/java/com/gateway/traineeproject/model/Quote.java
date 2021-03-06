package com.gateway.traineeproject.model;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * @author yash.bhalani
 *
 */
@Entity
public class Quote {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "QuoteAmount")
	private BigDecimal quoteAmount;
	
	@Column(name = "Status")
	private String status;
	
	@JoinColumn(name = "VehicleId",referencedColumnName = "id")
	private long vehicleId;
	
	@JoinColumn(name = "CustomerId",referencedColumnName = "id")
	private long customerId;
	
	@ManyToOne
	@JoinColumn(name = "LeaseId",referencedColumnName = "id")
	private LeaseMaster leaseMaster;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public BigDecimal getQuoteAmount() {
		return quoteAmount;
	}

	public void setQuoteAmount(BigDecimal quoteAmount) {
		this.quoteAmount = quoteAmount;
	}

	public String isStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public long getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(long vehicleId) {
		this.vehicleId = vehicleId;
	}

	public long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(long customerId) {
		this.customerId = customerId;
	}

	public LeaseMaster getLeaseMaster() {
		return leaseMaster;
	}

	public void setLeaseMaster(LeaseMaster leaseMaster) {
		this.leaseMaster = leaseMaster;
	}
}
