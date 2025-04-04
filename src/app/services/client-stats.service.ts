import { Injectable } from '@angular/core';
import { AppointmentService } from './appointment.service';

@Injectable({
  providedIn: 'root'
})
export class ClientStatsService {

  constructor(private appointmentService :AppointmentService) { }

  prepareChartData(data: any[]) {
    // 1. Grouper les services par client et par mois
    const monthlyData = data.reduce((acc, entry) => {
      const month = new Date(entry.createdAt).getMonth() + 1; // 1-12
      const year = new Date(entry.createdAt).getFullYear();
      const monthYear = `${year}-${month.toString().padStart(2, '0')}`;
      
      if (!acc[entry.clientID]) {
        acc[entry.clientID] = {};
      }
      
      if (!acc[entry.clientID][monthYear]) {
        acc[entry.clientID][monthYear] = 0;
      }
      
      acc[entry.clientID][monthYear] += entry.serviceList.length;
      
      return acc;
    }, {});

    // // 2. Calculer le total par client pour trouver le top 3
    // const clientTotals = Object.keys(monthlyData).map(clientID => {
    //   const total = Object.values(monthlyData[clientID]).reduce((sum: number, count: number) => sum + count, 0);
    //   return { clientID, total };
    // });

    // 3. Sélectionner les top 3 clients
    // const topClients = clientTotals
    //   .sort((a, b) => b.total - a.total)
    //   .slice(0, 3)
    //   .map(item => item.clientID);

    // 4. Formater les données pour NGX-Charts
    // const series = topClients.map(clientID => {
    //   const clientData = monthlyData[clientID];
    //   return {
    //     name: `Client ${clientID.slice(-4)}`,
    //     series: Object.keys(clientData).map(month => ({
    //       name: month,
    //       value: clientData[month]
    //     }))
    //   };
    // });

    // return series;
  }
}
