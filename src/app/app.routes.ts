import { Routes } from '@angular/router';
import { PersonalitiesComponent } from './components/personalities/personalities.component';
import { Gender } from './models/genders';
import { GendersComponent } from './components/genders/genders.component';
import { UsersComponent } from './components/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { InsertarpersonalidadComponent } from './components/personalities/insertarpersonalidad/insertarpersonalidad.component';
import { CreargenerosComponent } from './components/genders/creargeneros/creargeneros.component';
import { CrearusersComponent } from './components/users/crearusers/crearusers.component';
import { CrearrolesComponent } from './components/roles/crearroles/crearroles.component';
import { Roles } from './models/roles';
import { CarrerasComponent } from './components/carreras/carreras.component';
import { CrearcarrerasComponent } from './components/carreras/crearcarreras/crearcarreras.component';
import { IncidentesComponent } from './components/incidentes/incidentes.component';
import { CrearincidentesComponent } from './components/incidentes/crearincidentes/crearincidentes.component';
import { TipointeraccionComponent } from './components/tipointeraccion/tipointeraccion.component';
import { CreartipointeraccionComponent } from './components/tipointeraccion/creartipointeraccion/creartipointeraccion.component';
import { InteraccionComponent } from './components/interaccion/interaccion.component';
import { CrearinteraccionComponent } from './components/interaccion/crearinteraccion/crearinteraccion.component';
import { ChatsComponent } from './components/chats/chats.component';
import { CrearchatsComponent } from './components/chats/crearchats/crearchats.component';
import { HorariosComponent } from './components/horarios/horarios.component';
import { CrearhorariosComponent } from './components/horarios/crearhorarios/crearhorarios.component';
import { ReunionesComponent } from './components/reuniones/reuniones.component';
import { CrearreunionesComponent } from './components/reuniones/crearreuniones/crearreuniones.component';
import { AsignacionincidentesComponent } from './components/asignacionincidentes/asignacionincidentes.component';
import { CrearasignacionincComponent } from './components/asignacionincidentes/crearasignacioninc/crearasignacioninc.component';

export const routes: Routes = [
    {
        path:'personalidades',component:PersonalitiesComponent,
        children:[
            { path:'insertar',component:InsertarpersonalidadComponent },
            { path:'ediciones-personalidad/:id', component:InsertarpersonalidadComponent },
        ]
    },
    {
        path:'generos',component:GendersComponent,
        children:[
            { path:'insertar',component:CreargenerosComponent },
            { path:'ediciones-gender/:id', component:CreargenerosComponent },
        ]
    },
    {
        path:'usuarios',component:UsersComponent,
        children:[
            { path:'insertar',component:CrearusersComponent },
            { path:'ediciones-users/:id', component:CrearusersComponent },
        ]
    },
    {
        path:'roles', component: RolesComponent,
        children:[
            { path:'insertar',component:CrearrolesComponent },
            { path:'ediciones-roles/:id', component:CrearrolesComponent },
        ]
    },
    {
        path:'carreras', component: CarrerasComponent,
        children:[
            { path:'insertar',component:CrearcarrerasComponent },
            { path:'ediciones-carreras/:id', component:CrearcarrerasComponent },
        ]
    },
    {
        path:'incidentes', component: IncidentesComponent,
        children:[
            { path:'insertar',component:CrearincidentesComponent },
            { path:'ediciones-incidentes/:id', component:CrearincidentesComponent },
        ]
    },
    {
        path:'tipo-interacciones', component: TipointeraccionComponent,
        children:[
            { path:'insertar',component:CreartipointeraccionComponent },
            { path:'ediciones-tipo-interacciones/:id', component:CreartipointeraccionComponent },
        ]
    },
    {
        path:'interacciones', component: InteraccionComponent,
        children:[
            { path:'insertar',component:CrearinteraccionComponent },
            { path:'ediciones-interacciones/:id', component:CrearinteraccionComponent },
        ]
    },
    {
        path:'chats', component: ChatsComponent,
        children:[
            { path:'insertar',component:CrearchatsComponent },
            { path:'ediciones-chats/:id', component:CrearchatsComponent },
        ]
    },
    {
        path:'horarios', component: HorariosComponent,
        children:[
            { path:'insertar',component:CrearhorariosComponent },
            { path:'ediciones-horarios/:id', component:CrearhorariosComponent },
        ]
    },
    {
        path:'reuniones', component: ReunionesComponent,
        children:[
            { path:'insertar',component:CrearreunionesComponent },
            { path:'ediciones-reuniones/:id', component:CrearreunionesComponent },
        ]
    },
    {
        path:'asignacion-incidentes', component: AsignacionincidentesComponent,
        children:[
            { path:'insertar',component:CrearasignacionincComponent },
            { path:'ediciones-asignacion-incidentes/:id', component:CrearasignacionincComponent },
        ]
    }
];
