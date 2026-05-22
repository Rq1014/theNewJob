package org.example.karios.model.response.auth;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

/** GET /api/v1/auth/bindings 响应 */
@Data
@AllArgsConstructor
public class AuthBindingsResponse {
    private List<AuthBindingResponse> bindings;
}
