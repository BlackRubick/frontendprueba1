import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:4004');
  }

  // Escuchar eventos de WebSocket
  escucharMensajes(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('nuevaCola', (mensaje: string) => {
        observer.next(mensaje);
      });

      // Manejo de desconexión
      return () => {
        this.socket.off('nuevaCola');
      };
    });
  }
}
