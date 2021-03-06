﻿#pragma strict

	public var velocidade : float;
	public var velocidadeCorrendo : float;
	public var pulo : float;
	public var rotSpeed : float;
	private var gravidade : float = 0.9;
	private var jogador : CharacterController;
	private var velocidadeX : float;
	private var velocidadeY : float;
	
	public static var poder_correr : boolean = false;
	public var publicPodeCorrer : boolean = false;
	public var jumpSound : AudioClip;
	private var correr : boolean = false;
	private var frente : boolean = true;
	private var animacao : int;

function Start () {
	if(publicPodeCorrer == true){
		poder_correr = publicPodeCorrer;
	}
	rotSpeed = rotSpeed * 100;
	gravidade = gravidade * 60;
	jogador = GetComponent(CharacterController);
	animation.CrossFade("newIdle");
	animation["newWalk"].speed = 2.5;
	animation["newRun"].speed = 1.5;
	animation["newJump"].speed = 0.5;
}

function Update(){

		animacao = 0;
		if(Input.GetButtonDown("Jump")&&(jogador.isGrounded)){
			velocidadeY = pulo;
			AudioSource.PlayClipAtPoint(jumpSound, transform.position, 0.5 );
		}
		
		
		if(Input.GetAxis("Horizontal")&& Input.GetAxis("Run")){
			if(poder_correr){
				correr = true;
			}
		}
		else{
			correr = false;
		}
}

function FixedUpdate () {
		
		if(Input.GetAxis("Horizontal") < 0){
			if(correr){
				velocidadeX = velocidade*velocidadeCorrendo;
				if(jogador.isGrounded){
					animacao = 1;
					animation.CrossFade("newRun");
				}
			}
			else{
				velocidadeX = velocidade;
				if(jogador.isGrounded){
					animacao = 1;
					animation.CrossFade("newWalk");
				}
			}
			if(frente){
				transform.Rotate(0, rotSpeed* Time.deltaTime,0);
				if(transform.rotation.eulerAngles.y >= 180){
					transform.rotation.eulerAngles.y = 180;
					frente = false;
				}
			}
			else{
				if(transform.rotation.eulerAngles.y > 180){
					transform.Rotate(0, -rotSpeed* Time.deltaTime,0);
					if(transform.rotation.eulerAngles.y < 180){
						transform.rotation.eulerAngles.y = 180;
						frente = false;
					}
				}
			}
		}

		if(Input.GetAxis("Horizontal") > 0){
			if(correr){
				velocidadeX = -velocidade*velocidadeCorrendo;
				if(jogador.isGrounded){
					animacao = 1;
					animation.CrossFade("newRun");
				}
				//correr = false;
			}else{
				velocidadeX = -velocidade;
				if(jogador.isGrounded){
					animacao = 1;
					animation.CrossFade("newWalk");
				}
				//correr = false;
			}
			if(!frente){
				transform.Rotate(0, rotSpeed* Time.deltaTime,0);
				if(transform.rotation.eulerAngles.y < 180){
					transform.rotation.eulerAngles.y = 0;
					frente = true;
				}
			}
			else{
				if(transform.rotation.eulerAngles.y > 0){
					transform.Rotate(0, -rotSpeed* Time.deltaTime,0);
					if(transform.rotation.eulerAngles.y > 180){
						transform.rotation.eulerAngles.y = 0;
						frente = true;
					}
				}
			}
		}
		
		if(Input.GetAxis("Horizontal") == 0){
			velocidadeX = 0;
		}
		
		if(!jogador.isGrounded){
			velocidadeY -= gravidade*Time.deltaTime;
			animation.CrossFade("newJump");
			animacao = 1;
		}
		jogador.Move(Vector3(velocidadeX*Time.deltaTime,velocidadeY*Time.deltaTime,0));	
		
		if(animacao == 0){
			animation.CrossFade("newIdle");
		}
}