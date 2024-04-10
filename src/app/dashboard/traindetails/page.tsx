import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/traindetails/traindetails-filters';
import { CustomersTable } from '@/components/dashboard/traindetails/traindetails-table';
import type { Customer } from '@/components/dashboard/traindetails/traindetails-table';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

const customers = [
  {
    id: 'USR-010',
    name: 'Howrah Rajdhani',
    email: 'alcides.antonio@devias.io',
    phone: '60',
    address: { city: 'Madrid', country: 'Spain', state: 'Comunidad de Madrid', street: '4158 Hedge Street' },
    createdAt: 'AC 2-tier sleeper',
  },
  {
    id: 'USR-009',
    name: 'Sealdah Duronto',
    email: 'marcus.finn@devias.io',
    phone: '55',
    address: { city: 'Carson City', country: 'USA', state: 'Nevada', street: '2188 Armbrester Drive' },
    createdAt: 'AC 3-tier sleeper',
  },
  {
    id: 'USR-008',
    name: 'Kolkata Shatabdi',
    email: 'jie.yan.song@devias.io',
    phone: '70',
    address: { city: 'North Canton', country: 'USA', state: 'Ohio', street: '4894 Lakeland Park Drive' },
    createdAt: 'Executive Class',
  },
  {
    id: 'USR-007',
    name: 'Kolkata Rajdhani',
    email: 'nasimiyu.danai@devias.io',
    phone: '65',
    address: { city: 'Salt Lake City', country: 'USA', state: 'Utah', street: '368 Lamberts Branch Road' },
    createdAt: 'AC First Class',
  },
  {
    id: 'USR-006',
    name: 'Kolkata Mail',
    email: 'iulia.albu@devias.io',
    phone: '50',
    address: { city: 'Murray', country: 'USA', state: 'Utah', street: '3934 Wildrose Lane' },
    createdAt: 'Sleeper Class',
  },
  {
    id: 'USR-005',
    name: 'Kolkata Express',
    email: 'fran.perez@devias.io',
    phone: '68',
    address: { city: 'Atlanta', country: 'USA', state: 'Georgia', street: '1865 Pleasant Hill Road' },
    createdAt: 'AC Chair Car',
  },
  {
    id: 'USR-004',
    name: 'Kolkata Superfast',
    email: 'penjani.inyene@devias.io',
    phone: '66',
    address: { city: 'Berkeley', country: 'USA', state: 'California', street: '317 Angus Road' },
    createdAt: 'Second Sitting',
  },
  {
    id: 'USR-003',
    name: 'Kolkata Garib Rath',
    email: 'carson.darrin@devias.io',
    phone: '69',
    address: { city: 'Cleveland', country: 'USA', state: 'Ohio', street: '2849 Fulton Street' },
    createdAt: 'AC 3-tier Economy',
  },
  {
    id: 'USR-002',
    name: 'Kolkata Jan Shatabdi',
    email: 'siegbert.gottfried@devias.io',
    phone: '67',
    address: { city: 'Los Angeles', country: 'USA', state: 'California', street: '1798 Hickory Ridge Drive' },
    createdAt: 'AC Chair Car',
  },
  {
    id: 'USR-001',
    name: 'Kolkata Sampark Kranti',
    email: 'miron.vitold@devias.io',
    phone: '64',
    address: { city: 'San Diego', country: 'USA', state: 'California', street: '75247' },
    createdAt: 'AC 2-tier sleeper',
  },
] satisfies Customer[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Train details</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add Train
          </Button>
        </div>
      </Stack>
      <CustomersFilters />
      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
