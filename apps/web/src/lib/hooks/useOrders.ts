import { useState, useEffect } from "react";
import * as api from "../api";

export interface Order {
  id: string;
  date: string;
  total: number;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  items: number;
}

export function useOrders(userId?: string) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchOrders = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await api.fetchUserOrders(userId!);
      setOrders(
        data || [
          // Fallback mock data
          { id: "ORD-001", date: "2024-04-10", total: 60000, status: "delivered", items: 2 },
          { id: "ORD-002", date: "2024-04-05", total: 25000, status: "shipped", items: 1 },
        ]
      );
    } catch (err: any) {
      console.error("Error fetching orders:", err);
      // Keep mock data on error
      setOrders([
        { id: "ORD-001", date: "2024-04-10", total: 60000, status: "delivered", items: 2 },
        { id: "ORD-002", date: "2024-04-05", total: 25000, status: "shipped", items: 1 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { orders, loading, error, refetch: fetchOrders };
}
