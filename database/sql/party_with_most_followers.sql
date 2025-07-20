SELECT party_affiliation, COUNT(*) AS total_count
FROM users
GROUP BY party_affiliation
HAVING COUNT(*) = (
  SELECT MAX(counts)
  FROM (
    SELECT COUNT(*) AS counts
    FROM users
    GROUP BY party_affiliation
  ) AS subquery
);
