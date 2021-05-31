import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';

type Props = {
  arrLimit: number[],
  onChange: (v: number) => void,
  forceLimit: number
};

const SimplePaginLimit: React.FC<Props> = ({ arrLimit, onChange, forceLimit }) => {
  const [limit, setLimit] = useState(arrLimit[0]);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setLimit(Number(e.target.value));
    onChange(Number(e.target.value));
  }

  useEffect(() => {
    const idxLimit = arrLimit.indexOf(forceLimit);
    if (idxLimit >= 0) {
      setLimit(arrLimit[idxLimit]);
    }
  }, [forceLimit]);

  return (
    <FormGroup row>
      <Label for='limit'>Limit items on page:</Label>
      <Col sm={1.5}>
        <Input
          type='select'
          name='limit'
          value={limit}
          onChange={handleChange}
        >
          {
            arrLimit.map((val, index) => {
              return <option key={index} >{val}</option>
            })
          }
        </Input>
      </Col>
    </FormGroup>
  );
};

export default SimplePaginLimit;