package com.mitocode.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "detalle_consulta")
public class DetalleConsulta {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idDetalle;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "id_consulta", nullable = false, foreignKey = @ForeignKey(name = "FK_consulta_detalle"))
	private Consulta consulta;

	@Column(name = "diagnostico", nullable = false, length = 70)
	private String diagnostico;

	@Column(name = "tratamiento", nullable = false, length = 300)
	private String tratamiento;

	public Integer getIdDetalle() {
		return idDetalle;
	}

	public void setIdDetalle(Integer idDetalle) {
		this.idDetalle = idDetalle;
	}

	public Consulta getConsulta() {
		return consulta;
	}

	public void setConsulta(Consulta consulta) {
		this.consulta = consulta;
	}

	public String getDiagnostico() {
		return diagnostico;
	}

	public void setDiagnostico(String diagnostico) {
		this.diagnostico = diagnostico;
	}

	public String getTratamiento() {
		return tratamiento;
	}

	public void setTratamiento(String tratamiento) {
		this.tratamiento = tratamiento;
	}

	// Consulta
	// id_consulta | id_paciente | id_medico | fecha
	// 1 1 1 25/04/2021

	// DetalleConsulta
	// id_detalle | id_consulta | diagnostico | tratamiento
	// 1 1 FIEBRE ANALGESICOS
	// 2 1 INFECCION ANTIBIOTICOS
}
