export const getTableData =  async () => {
  const res = await fetch("http://localhost:4000/users");

  if(!res.ok) {
    throw new Error(`Could not fetch data, received ${res.status}`);
  }

  const data = await res.json();
  return data;
}

export const postRow =  async (newRow ) => {
  const res = await fetch("http://localhost:4000/users",{ method: "POST", headers: {"Content-Type": "application/json"},  body: JSON.stringify({
    id: newRow.id,
    firstName: newRow.firstName,
    lastName: newRow.lastName,
    group: newRow.group
  })});


  if(!res.ok) {
    throw new Error(`Could not post data, received ${res.status}`);
  }

  const data = await res.json();
  return data;
}

