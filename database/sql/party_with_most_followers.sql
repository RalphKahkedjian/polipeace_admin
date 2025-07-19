SELECT party_affiliation, COUNT(*) AS total_count
FROM users
GROUP BY party_affiliation
ORDER BY total_count DESC
LIMIT 1