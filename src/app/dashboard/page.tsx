'use client';
import React, { useEffect, useState } from 'react';
// import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
// import dayjs from 'dayjs';

// import { config } from '@/config';
// import { Balance } from '@/components/dashboard/overview/budget';
import { LatestReservations } from '@/components/dashboard/overview/latest-orders';
// import { LatestProducts } from '@/components/dashboard/overview/latest-products';
// import { Sales } from '@/components/dashboard/overview/sales';
// import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
// import { Traffic } from '@/components/dashboard/overview/traffic';

import { getDocs, query, where, collection } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';


// export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  const [reservationCount, setReservationCount] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);

  useEffect(() => {
    const fetchReservations = async () => {
      const email = auth.currentUser?.email;
      if (email) {
        const q = query(collection(db, 'reservations'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        setReservationCount(querySnapshot.size);
        let tickets = 0;
        querySnapshot.forEach((doc) => {
          tickets += doc.data().numTickets;
        });
        setTotalTickets(tickets);
      }
    };

    fetchReservations();
  }, []);
  return (
    <Grid container spacing={3}>
      {/* <Grid lg={3} sm={6} xs={12}>
        <Balance diff={12} trend="up" sx={{ height: '100%' }} value="$24k" />
      </Grid> */}
      <Grid lg={4} sm={6} xs={12}>
        <TotalCustomers diff={0} trend="down" sx={{ height: '100%' }} value={reservationCount.toString()} />
      </Grid>
      {/* <Grid lg={3} sm={6} xs={12}>
        <TasksProgress sx={{ height: '100%' }} value={75.5} />
      </Grid> */}
      <Grid lg={4} sm={6} xs={12}>
        <TotalProfit sx={{ height: '100%' }} value={totalTickets.toString()} />
      </Grid>
      {/* <Grid lg={8} xs={12}>
        <Sales
          chartSeries={[
            { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
            { name: 'Last year', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <Traffic chartSeries={[63, 15, 22]} labels={['Desktop', 'Tablet', 'Phone']} sx={{ height: '100%' }} />
      </Grid> */}
      {/* <Grid lg={4} md={6} xs={12}>
        <LatestProducts
          products={[
            {
              id: 'PRD-005',
              name: 'Soja & Co. Eucalyptus',
              image: '/assets/product-5.png',
              updatedAt: dayjs().subtract(18, 'minutes').subtract(5, 'hour').toDate(),
            },
            {
              id: 'PRD-004',
              name: 'Necessaire Body Lotion',
              image: '/assets/product-4.png',
              updatedAt: dayjs().subtract(41, 'minutes').subtract(3, 'hour').toDate(),
            },
            {
              id: 'PRD-003',
              name: 'Ritual of Sakura',
              image: '/assets/product-3.png',
              updatedAt: dayjs().subtract(5, 'minutes').subtract(3, 'hour').toDate(),
            },
            {
              id: 'PRD-002',
              name: 'Lancome Rouge',
              image: '/assets/product-2.png',
              updatedAt: dayjs().subtract(23, 'minutes').subtract(2, 'hour').toDate(),
            },
            {
              id: 'PRD-001',
              name: 'Erbology Aloe Vera',
              image: '/assets/product-1.png',
              updatedAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid> */}
      <Grid lg={12} md={12} xs={12}>
        <LatestReservations/>
      </Grid>
    </Grid>
  );
}
