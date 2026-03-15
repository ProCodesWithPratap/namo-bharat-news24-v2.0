import { Client } from 'pg'

const REQUIRED_TABLES = ['users', 'users_sessions']

const REQUIRED_COLUMNS = {
  users: ['id', 'email'],
  users_sessions: ['id', 'expires_at']
}

const SESSION_OWNER_COLUMN_ALIASES = ['user_id', '_parent_id', 'parent_id', 'users_id']

export const inspectAuthSchema = async (connectionString) => {
  const client = new Client({ connectionString })
  await client.connect()

  try {
    const tableResult = await client.query(
      `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name = ANY($1::text[])
      `,
      [REQUIRED_TABLES]
    )

    const existingTables = new Set(tableResult.rows.map((row) => row.table_name))
    const missingTables = REQUIRED_TABLES.filter((name) => !existingTables.has(name))

    const columnResult = await client.query(
      `
      SELECT table_name, column_name
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = ANY($1::text[])
      `,
      [REQUIRED_TABLES]
    )

    const columnsByTable = new Map()
    for (const tableName of REQUIRED_TABLES) {
      columnsByTable.set(tableName, new Set())
    }

    for (const row of columnResult.rows) {
      columnsByTable.get(row.table_name)?.add(row.column_name)
    }

    const missingColumns = {}

    for (const [tableName, required] of Object.entries(REQUIRED_COLUMNS)) {
      if (!existingTables.has(tableName)) {
        continue
      }

      const columns = columnsByTable.get(tableName) || new Set()
      const absent = required.filter((columnName) => !columns.has(columnName))
      if (absent.length > 0) {
        missingColumns[tableName] = absent
      }
    }

    if (existingTables.has('users_sessions')) {
      const columns = columnsByTable.get('users_sessions') || new Set()
      const hasSessionOwnerColumn = SESSION_OWNER_COLUMN_ALIASES.some((name) => columns.has(name))

      if (!hasSessionOwnerColumn) {
        missingColumns.users_sessions = [
          ...(missingColumns.users_sessions || []),
          `one of: ${SESSION_OWNER_COLUMN_ALIASES.join(', ')}`
        ]
      }
    }

    const status =
      missingTables.length > 0
        ? 'missing_tables'
        : Object.keys(missingColumns).length > 0
          ? 'missing_columns'
          : 'ok'

    return {
      status,
      missingTables,
      missingColumns
    }
  } finally {
    await client.end()
  }
}
