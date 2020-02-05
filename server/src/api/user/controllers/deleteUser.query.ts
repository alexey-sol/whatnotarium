export default `
    DELETE FROM
        users
    WHERE
        id = $1;
`;
