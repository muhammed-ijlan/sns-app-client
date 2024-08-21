import Currency from 'react-currency-formatter';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useNavigate } from 'react-router-dom';
import Label from '../../components/Label';
import { capitalCase } from "change-case"
// ----------------------------------------------------------------------

export default function HomeTableRow({
  id,
  slno,
  firstName,
  lastName,
  role,
  email,
  mobileNumber
}) {


  const navigate = useNavigate();

  return (
    <>
      <TableRow hover tabIndex={-1} key={id}>

        <TableCell>{slno}</TableCell>

        <TableCell>{id}</TableCell>
        <TableCell>{capitalCase(firstName)}</TableCell>
        <TableCell>{capitalCase(lastName)}</TableCell>
        <TableCell>
          {mobileNumber}
        </TableCell>
        <TableCell>
          {email}
        </TableCell>
        <TableCell>
          <Label color={(role === "USER" && 'warning') || 'success'}>{role}</Label>
        </TableCell>



      </TableRow>
    </>
  );
}
