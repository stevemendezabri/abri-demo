import { useState, useEffect, useRef } from 'react';
import * as duckdb from '@duckdb/duckdb-wasm';
import { MANUAL_BUNDLES, INITIAL_TREES_SCHEMA, SEED_TREES_DATA } from '../config/duckdb.config';

export function useDuckDB() {
  const [treeInventory, setTreeInventory] = useState([]);
  const [selectedTree, setSelectedTree] = useState(null);
  const dbRef = useRef(null);
  const connRef = useRef(null);

  const fetchTrees = async (search = '', status = 'All Trees', segment = 'All Segments') => {
    if (!connRef.current) return;

    let sql = `SELECT * FROM trees WHERE 1=1`;

    if (search) {
      const term = search.toLowerCase();
      sql += ` AND (LOWER(species) LIKE '%${term}%' OR LOWER(common_name) LIKE '%${term}%' OR LOWER(id) LIKE '%${term}%')`;
    }
    if (status && status !== 'All Trees') {
      sql += ` AND status = '${status}'`;
    }
    if (segment && segment !== 'All Segments') {
      sql += ` AND segment LIKE '${segment}%'`;
    }

    try {
      const result = await connRef.current.query(sql);
      const rows = result.toArray().map(r => r.toJSON());
      setTreeInventory(rows);
      setSelectedTree(prev => prev || (rows.length > 0 ? rows[0] : null));
    } catch (err) {
      console.error("Query Execution Error:", err);
    }
  };

  useEffect(() => {
    async function initDuckDB() {
      try {
        const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);
        const worker = new Worker(bundle.mainWorker);
        const logger = new duckdb.ConsoleLogger();
        const db = new duckdb.AsyncDuckDB(logger, worker);
        await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
        
        const conn = await db.connect();
        dbRef.current = db;
        connRef.current = conn;

        await conn.query(INITIAL_TREES_SCHEMA);
        await conn.query(SEED_TREES_DATA);

        await fetchTrees();
      } catch (err) {
        console.error("DuckDB Init Error:", err);
      }
    }

    initDuckDB();

    return () => {
      if (connRef.current) connRef.current.close();
      if (dbRef.current) dbRef.current.terminate();
    };
  }, []);

  return { treeInventory, selectedTree, setSelectedTree, fetchTrees };
}