export default `
    UPDATE
        users
    SET
        email = COALESCE($1, email),
        password = COALESCE($2, password),
        name = COALESCE($3, name)
    WHERE
        id = $4
    AND (
        $1 IS DISTINCT FROM email OR
        $2 IS DISTINCT FROM password OR
        $3 IS DISTINCT FROM name
    )
    RETURNING
        email,
        name;
`;
